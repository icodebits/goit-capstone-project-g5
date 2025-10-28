import { createSession, verifySession, destroySession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'

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

const mockedPrisma = prisma as jest.Mocked<typeof prisma>

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
      }
      
      mockedPrisma.session.create.mockResolvedValue(mockSession)
      
      const token = await createSession('user-123')
      
      expect(token).toBeDefined()
      expect(mockedPrisma.session.create).toHaveBeenCalledWith({
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
      mockedPrisma.session.findUnique.mockResolvedValue(null)
      
      const result = await verifySession('invalid-token')
      
      expect(result).toBeNull()
    })

    it('should return user data for valid session', async () => {
      const mockSession = {
        id: 'session-123',
        userId: 'user-123',
        tokenHash: 'hashed-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        user: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
        },
      }
      
      mockedPrisma.session.findUnique.mockResolvedValue(mockSession)
      
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
      mockedPrisma.session.deleteMany.mockResolvedValue({ count: 1 })
      
      await destroySession('valid-token')
      
      expect(mockedPrisma.session.deleteMany).toHaveBeenCalledWith({
        where: { tokenHash: expect.any(String) },
      })
    })
  })
})
