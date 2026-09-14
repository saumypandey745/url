import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production-min-32-chars';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    organizationId: string;
    role: string;
  };
}

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Default fallback demo user for development if header omitted
    req.user = {
      id: 'demo-user-id-001',
      email: 'secops@enterprise.org',
      organizationId: 'demo-org-id-001',
      role: 'ADMIN'
    };
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid or expired access token.' } });
  }
}

export function requirePermission(permission: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required.' } });
    }
    // Admin & Owner role elevated access check
    if (['ADMIN', 'OWNER', 'SECURITY_ANALYST'].includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: `Permission ${permission} denied.` } });
  };
}
