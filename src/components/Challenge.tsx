import { OptionType } from "@/types/data";
import OptionsProfit from "./OptionsProfit";

type ChallengeProps = {
  optionsData: OptionType[];
};

const Challenge = ({ optionsData }: ChallengeProps) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Reward & Risk Graph</h1>
      <OptionsProfit initialOptions={optionsData} />
    </div>
  );
};

export default Challenge;
