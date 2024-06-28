import React, { useState, useMemo, useCallback } from "react";
import OptionStrategyList from "./OptionsList";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { OptionType } from "@/types/data";
import Button from "./Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PRICES = Array.from({ length: 15 }, (_, index) => index * 10);

type OptionsProfitProps = {
  initialOptions: OptionType[];
};

const OptionsProfit = ({ initialOptions }: OptionsProfitProps) => {
  const [options, setOptions] = useState([...initialOptions]);
  const [maxProfit, setMaxProfit] = useState(0);
  const [maxLoss, setMaxLoss] = useState(0);
  const [breakEvenPoints, setBreakEvenPoints] = useState<number[]>([]);
  const [profits, setProfits] = useState(PRICES.map(() => 0));

  const chartData = useMemo(
    () => ({
      labels: PRICES,
      datasets: [
        {
          label: "Profit/Loss",
          data: profits,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    }),
    [profits]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Price of Underlying at Expiry",
          },
        },
        y: {
          title: {
            display: true,
            text: "Profit/Loss",
          },
        },
      },
    }),
    []
  );

  const handleAddOption = useCallback(() => {
    setOptions([
      ...options,
      {
        strike_price: null,
        type: "Call",
        bid: null,
        ask: null,
        long_short: "long",
      },
    ]);
  }, [options]);

  const handleRemoveOption = useCallback(
    (index: number) => {
      setOptions(options.filter((_, i) => i !== index));
    },
    [options]
  );

  const handleUpdateOption = useCallback(
    (index: number, updatedOption: OptionType) => {
      setOptions(
        options.map((option, i) => (i === index ? updatedOption : option))
      );
    },
    [options]
  );

  const analyzeOptions = useCallback(() => {
    const newProfits = PRICES.map((price) => calculateProfit(price));
    setProfits(newProfits);
    setMaxProfit(Math.max(...newProfits));
    setMaxLoss(Math.min(...newProfits));
    setBreakEvenPoints(calculateBreakEvenPoints(newProfits, PRICES));
  }, [options]);

  const calculateProfit = useCallback(
    (price: number) => {
      return options.reduce((totalProfit, option) => {
        const { type, strike_price, bid, ask, long_short } = option;
        const premium = ((bid ?? 0) + (ask ?? 0)) / 2;
        const quantity = long_short.toLowerCase() === "long" ? 1 : -1;

        if (type.toLowerCase() === "call") {
          const intrinsicValue = Math.max(price - (strike_price ?? 0), 0);
          totalProfit += (intrinsicValue - premium) * quantity;
        } else if (type.toLowerCase() === "put") {
          const intrinsicValue = Math.max((strike_price ?? 0) - price, 0);
          totalProfit += (intrinsicValue - premium) * quantity;
        }

        return totalProfit;
      }, 0);
    },
    [options]
  );

  const calculateBreakEvenPoints = useCallback(
    (profits: number[], prices: number[]) => {
      const breakEvens = [];
      for (let i = 1; i < profits.length; i++) {
        if (
          (profits[i - 1] < 0 && profits[i] > 0) ||
          (profits[i - 1] > 0 && profits[i] < 0)
        ) {
          breakEvens.push(prices[i]);
        }
      }
      return breakEvens;
    },
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <OptionStrategyList
          options={options}
          onAddOption={handleAddOption}
          onUpdateOption={handleUpdateOption}
          onRemoveOption={handleRemoveOption}
        />
        {options.length > 0 && (
          <div className="mt-4 border-t py-4">
            <Button variant="secondary" onClick={analyzeOptions}>
              Analyze
            </Button>
          </div>
        )}
      </div>
      <div>
        {options.length > 0 ? (
          <>
            <h3>Max Profit: {maxProfit}</h3>
            <h3>Max Loss: {maxLoss}</h3>
            <h3>Break Even Points: {breakEvenPoints.join(", ")}</h3>
            <Line data={chartData} options={chartOptions} />
          </>
        ) : (
          <p>No options selected.</p>
        )}
      </div>
    </div>
  );
};

export default OptionsProfit;
