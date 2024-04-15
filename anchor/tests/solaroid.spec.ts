import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Solaroid } from '../target/types/solaroid';

describe('solaroid', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Solaroid as Program<Solaroid>;

  const solaroidKeypair = Keypair.generate();

  it('Initialize Solaroid', async () => {
    await program.methods
      .initialize()
      .accounts({
        solaroid: solaroidKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solaroidKeypair])
      .rpc();

    const currentCount = await program.account.solaroid.fetch(
      solaroidKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Solaroid', async () => {
    await program.methods
      .increment()
      .accounts({ solaroid: solaroidKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.solaroid.fetch(
      solaroidKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Solaroid Again', async () => {
    await program.methods
      .increment()
      .accounts({ solaroid: solaroidKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.solaroid.fetch(
      solaroidKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement Solaroid', async () => {
    await program.methods
      .decrement()
      .accounts({ solaroid: solaroidKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.solaroid.fetch(
      solaroidKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set solaroid value', async () => {
    await program.methods
      .set(42)
      .accounts({ solaroid: solaroidKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.solaroid.fetch(
      solaroidKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the solaroid account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solaroid: solaroidKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solaroid.fetchNullable(
      solaroidKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
