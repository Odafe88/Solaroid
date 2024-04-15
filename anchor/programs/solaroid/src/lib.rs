#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("2ujRr3ZbacRVVmYxLMzPRXuoTHLpdk421LfkKheoodLR");

#[program]
pub mod solaroid {
    use super::*;

  pub fn close(_ctx: Context<CloseSolaroid>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solaroid.count = ctx.accounts.solaroid.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solaroid.count = ctx.accounts.solaroid.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolaroid>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solaroid.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolaroid<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solaroid::INIT_SPACE,
  payer = payer
  )]
  pub solaroid: Account<'info, Solaroid>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolaroid<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solaroid: Account<'info, Solaroid>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solaroid: Account<'info, Solaroid>,
}

#[account]
#[derive(InitSpace)]
pub struct Solaroid {
  count: u8,
}
