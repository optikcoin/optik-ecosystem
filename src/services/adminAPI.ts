// services/AdminAPIService.ts
export class AdminAPIService {
  static async verifyKYC(data: {
    fullName: string;
    email: string;
    country: string;
    idNumber: string;
    publicKey?: string;
  }): Promise<{ message: string }> {
    const response = await fetch('/api/kyc/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'KYC verification failed');
    }

    return response.json();
  }
}
