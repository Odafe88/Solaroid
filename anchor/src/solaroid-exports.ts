// Here we export some useful types and functions for interacting with the Anchor program.
import { Cluster, PublicKey } from '@solana/web3.js';
import type { Solaroid } from '../target/types/solaroid';
import { IDL as SolaroidIDL } from '../target/types/solaroid';

// Re-export the generated IDL and type
export { Solaroid, SolaroidIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const SOLAROID_PROGRAM_ID = new PublicKey(
  '2ujRr3ZbacRVVmYxLMzPRXuoTHLpdk421LfkKheoodLR'
);

// This is a helper function to get the program ID for the Solaroid program depending on the cluster.
export function getSolaroidProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return SOLAROID_PROGRAM_ID;
  }
}
