'use client';

import { SolaroidIDL, getSolaroidProgramId } from '@solaroid/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useSolaroidProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getSolaroidProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = new Program(SolaroidIDL, programId, provider);

  const accounts = useQuery({
    queryKey: ['solaroid', 'all', { cluster }],
    queryFn: () => program.account.solaroid.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['solaroid', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ solaroid: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useSolaroidProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useSolaroidProgram();

  const accountQuery = useQuery({
    queryKey: ['solaroid', 'fetch', { cluster, account }],
    queryFn: () => program.account.solaroid.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['solaroid', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ solaroid: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['solaroid', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ solaroid: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['solaroid', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ solaroid: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['solaroid', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ solaroid: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
