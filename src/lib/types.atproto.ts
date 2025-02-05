export interface PDSService {
  id: string;
  type: string;
  serviceEndpoint: string;
}

export interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase: string;
}

export interface DidDocument {
  id: string;
  "@context": string[];
  alsoKnownAs: string[];
  verificationMethod: VerificationMethod[];
  service: PDSService[];
}
