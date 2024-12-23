export default class VerifiedPyme {
  is_success: boolean;
  error?: string;
  pyme?: {
    pyme_rut: string;
    rut: string;
    social_reason: string;
    data: {
      key: string;
      value: string;
    }[];
    activities: {
      giro: string;
      code: number;
      category: string;
      affects_iva: boolean;
    }[];
    documents: {
      type: string;
      year: number;
    }[];
  };
}
