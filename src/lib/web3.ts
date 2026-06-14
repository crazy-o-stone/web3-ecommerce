import { ethers } from "ethers";

const ESCROW_ABI = [
  "function createEscrow(address seller, uint256 deadline) external payable returns (uint256)",
  "function release(uint256 id) external",
  "function refund(uint256 id) external",
  "function escrows(uint256) external view returns (address buyer, address seller, uint256 amount, uint8 status)",
];

export function getEscrowContract(
  provider: ethers.Provider,
  contractAddress: string,
  signer?: ethers.Signer
) {
  return new ethers.Contract(
    contractAddress,
    ESCROW_ABI,
    signer || provider
  );
}

export async function createPayment(
  signer: ethers.Signer,
  contractAddress: string,
  seller: string,
  amount: string,
  deadlineDays: number = 30
) {
  const contract = getEscrowContract(signer.provider!, contractAddress, signer);
  const deadline = Math.floor(Date.now() / 1000) + deadlineDays * 86400;
  const tx = await contract.createEscrow(seller, deadline, { value: ethers.parseEther(amount) });
  const receipt = await tx.wait();
  return { txHash: receipt.hash, escrowId: receipt.logs[0]?.index ?? 0 };
}

export async function releasePayment(
  signer: ethers.Signer,
  contractAddress: string,
  escrowId: number
) {
  const contract = getEscrowContract(signer.provider!, contractAddress, signer);
  const tx = await contract.release(escrowId);
  return tx.wait();
}

export async function refundPayment(
  signer: ethers.Signer,
  contractAddress: string,
  escrowId: number
) {
  const contract = getEscrowContract(signer.provider!, contractAddress, signer);
  const tx = await contract.refund(escrowId);
  return tx.wait();
}
