'use client';

import { AppHero } from '../ui/ui-layout';
import { AccountChecker } from '../account/account-ui';
import { ClusterChecker } from '../cluster/cluster-ui';

const links: { label: string; href: string }[] = [
  {label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  {
    label: 'Solana Developers GitHub',
    href: 'https://github.com/solana-developers/',
  },
];
  

export default function DashboardFeature() {
  return (
    <div className="w-screen h-screen bg-gradient-to-r  from-yellow-200 to-pink-400">
      <section className="w-full h-full bg-grey flex items-stat justify-between px-20 py-4">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mt-28">Welcome to Solaroid</h1>
          <p>Submit your Address and claim your Airdrop</p>
          <ClusterChecker>
            <AccountChecker />
          </ClusterChecker>
        </div>
        <div className="w-1/2">
          <div className="h-[500px] w-full px-[20px] bg-slate-400 opacity-[50%] rounded-md">
            <div className="w-full ">

            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
