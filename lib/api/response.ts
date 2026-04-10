/**
 * Standardized API Response Handler
 * Ensures consistent error and success response formats
 */

import { DomainError } from '@/lib/types';
import { NextResponse } from 'next/server';

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export class ApiResponse {
  /**
   * Return successful response
   */
  static success<T>(data: T) {
    return NextResponse.json(
      {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      } as ApiSuccessResponse<T>,
      { status: 200 }
    );
  }

  /**
   * Return error response
   */
  static error(error: DomainError | Error | unknown) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        } as ApiErrorResponse,
        { status: error.statusCode }
      );
    }

    const unknownError = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: unknownError,
        },
        timestamp: new Date().toISOString(),
      } as ApiErrorResponse,
      { status: 500 }
    );
  }
}
