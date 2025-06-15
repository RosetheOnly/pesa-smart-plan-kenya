
import React from "react";
import { Gift, Users, DollarSign } from "lucide-react";

interface ReferralData {
  totalReferrals: number;
  successfulReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  referralCode: string;
}

interface Props {
  language: "en" | "sw";
  referralData: ReferralData;
}

const referralCopy = {
  en: {
    title: "Referral Program",
    yourCode: "Your Referral Code",
    totalReferrals: "Total Referrals",
    successful: "Successful",
    totalEarned: "Total Earned",
    pending: "Pending",
    howItWorks: "How it works:",
    step1: "Share your referral code with friends",
    step2: "They make a purchase using your code",
    step3: "You earn 1-5 KSh discount based on purchase value",
    copyCode: "Copy Code",
  },
  sw: {
    title: "Mpango wa Mdalali",
    yourCode: "Namba Yako ya Mdalali",
    totalReferrals: "Jumla ya Mdalali",
    successful: "Zilizofanikiwa",
    totalEarned: "Jumla Uliyopata",
    pending: "Zinasubiri",
    howItWorks: "Jinsi inavyofanya kazi:",
    step1: "Shiriki namba yako ya mdalali na marafiki",
    step2: "Wananunua wakitumia namba yako",
    step3: "Unapata punguzo la KSh 1-5 kulingana na thamani ya ununuzi",
    copyCode: "Nakili Namba",
  },
};

const ReferralTracker: React.FC<Props> = ({ language, referralData }) => {
  const copy = referralCopy[language];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralData.referralCode);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Gift className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-bold">{copy.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{referralData.totalReferrals}</p>
          <p className="text-sm text-gray-600">{copy.totalReferrals}</p>
          <p className="text-xs text-green-600">{referralData.successfulReferrals} {copy.successful}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 text-center">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">KSh {referralData.totalEarnings}</p>
          <p className="text-sm text-gray-600">{copy.totalEarned}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">KSh {referralData.pendingEarnings}</p>
          <p className="text-sm text-gray-600">{copy.pending}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">{copy.yourCode}</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-white border rounded px-3 py-2 font-mono text-lg">
            {referralData.referralCode}
          </code>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {copy.copyCode}
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-3">{copy.howItWorks}</h3>
        <ol className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
            {copy.step1}
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
            {copy.step2}
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
            {copy.step3}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ReferralTracker;
