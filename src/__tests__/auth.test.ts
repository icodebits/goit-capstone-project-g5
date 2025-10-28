import { createSession, verifySession, destroySession } from '@/lib/auth/session'

// Mock crypto functions
const mockCrypto = {
  getRandomValues: jest.fn((arr: Uint8Array) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256)
    }
    return arr
  }),
  subtle: {
    digest: jest.fn(async (algorithm: string, data: Uint8Array) => {
      // Simple mock hash function
      const hash = Array.from(data).reduce((acc: number, byte: number) => acc + byte, 0).toString(16)
      return new Uint8Array(hash.length).fill(0)
    }),
  },
}

// Mock global crypto
Object.defineProperty(global, 'crypto', {
  value: mockCrypto,
  writable: true,
})

// Mock Prisma
jest.mock('@/lib/db', () => ({
  prisma: {
    session: {
      create: jest.fn(),
      findUnique: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}))

// Import the mocked prisma for use in tests
import { prisma } from '@/lib/db'

// Get the mocked functions with proper typing
const mockPrisma = jest.mocked(prisma)

describe('Session Management', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createSession', () => {
    it('should create a session with valid user ID', async () => {
      const mockSession = {
        id: 'session-123',
        userId: 'user-123',
        tokenHash: 'hashed-token',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      mockPrisma.session.create.mockResolvedValue(mockSession)
      
      const token = await createSession('user-123')
      
      expect(token).toBeDefined()
      expect(mockPrisma.session.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          tokenHash: expect.any(String),
          expiresAt: expect.any(Date),
        },
      })
    })
  })

  describe('verifySession', () => {
    it('should return null for invalid token', async () => {
      mockPrisma.session.findUnique.mockResolvedValue(null)
      
      const result = await verifySession('invalid-token')
      
      expect(result).toBeNull()
    })

    it('should return user data for valid session', async () => {
      const mockSession = {
        id: 'session-123',
        userId: 'user-123',
        tokenHash: 'hashed-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
        },
      }
      
      mockPrisma.session.findUnique.mockResolvedValue(mockSession)
      
      const result = await verifySession('valid-token')
      
      expect(result).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      })
    })
  })

  describe('destroySession', () => {
    it('should delete session for valid token', async () => {
      mockPrisma.session.deleteMany.mockResolvedValue({ count: 1 })
      
      await destroySession('valid-token')
      
      expect(mockPrisma.session.deleteMany).toHaveBeenCalledWith({
        where: { tokenHash: expect.any(String) },
      })
    })
  })
})
