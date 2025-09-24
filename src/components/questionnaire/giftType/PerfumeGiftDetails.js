import React, { useEffect } from "react";

const PerfumeGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
  ageType,
  setGiftValid,
}) => {
  const handleCheckboxChange = (field, value) => {
    const current = gift[field] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    handleGiftSelection(recipientId, index, field, updated);
  };


   useEffect(() => {
    let isValid = false;

    if (ageType === "Kid") {
      isValid =
        gift.perfumeBudget &&
        gift.perfumeScent?.length > 0 &&
        (!gift.perfumeScent.includes("Other") || gift.perfumeScentOther?.trim());
    } else {
      isValid = gift.perfumePrice && gift.perfumeScent;
    }

    setGiftValid(index, isValid);
  }, [gift, ageType, index, setGiftValid]);

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-rose-600 mb-4">
        Perfume Preferences
      </h4>

      {/* 💰 Price or Budget */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          What is your budget for the perfume?
        </label>
        <div className="flex flex-col space-y-2">
          {(ageType === "Kid"
            ? ["1000–1500 PKR", "1500–2000 PKR", "2000–2500 PKR", "2500–3000 PKR"]
            : ["5000 PKR", "5000–7000 PKR", "7000–10,000 PKR", "10,000–12,000 PKR", "12,000–15,000 PKR"]
          ).map((price) => (
            <label key={price} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`perfumePrice-${recipientId}-${index}`}
                checked={
                  ageType === "Kid"
                    ? gift.perfumeBudget === price
                    : gift.perfumePrice === price
                }
                onChange={() =>
                  handleGiftSelection(
                    recipientId,
                    index,
                    ageType === "Kid" ? "perfumeBudget" : "perfumePrice",
                    price
                  )
                }
              />
              <span className="text-gray-700">{price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 🌸 Scent */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          {ageType === "Kid"
            ? "Does the child have a preferred scent?"
            : "Scent"}
        </label>
        <div
          className={
            ageType === "Kid"
              ? "grid grid-cols-2 md:grid-cols-3 gap-3"
              : "flex flex-col space-y-2"
          }
        >
          {(ageType === "Kid"
            ? ["Floral", "Fruity", "Citrus", "Woody", "Other"]
            : ["Floral", "Spicy", "Sweet"]
          ).map((scent) => (
            <label key={scent} className="flex items-center space-x-2">
              <input
                type={ageType === "Kid" ? "checkbox" : "radio"}
                name={`perfumeScent-${recipientId}-${index}`}
                checked={
                  ageType === "Kid"
                    ? gift.perfumeScent?.includes(scent)
                    : gift.perfumeScent === scent
                }
                onChange={(e) =>
                  ageType === "Kid"
                    ? handleCheckboxChange("perfumeScent", scent)
                    : handleGiftSelection(
                      recipientId,
                      index,
                      "perfumeScent",
                      scent
                    )
                }
              />
              <span className="text-gray-700">{scent}</span>
            </label>
          ))}
        </div>

        {/* Other scent input for kids */}
        {ageType === "Kid" && gift.perfumeScent?.includes("Other") && (
          <input
            type="text"
            value={gift.perfumeScentOther || ""}
            onChange={(e) =>
              handleGiftSelection(
                recipientId,
                index,
                "perfumeScentOther",
                e.target.value
              )
            }
            placeholder="Please specify"
            className="mt-3 w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        )}
      </div>
    </div>
  );
}
export default PerfumeGiftDetails;
