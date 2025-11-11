import { useEffect, useCallback } from "react";

const KidGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
  setGiftValid,
}) => {
  const selectedType = gift.type;
  console.log("Selected gift type:", selectedType);


  const handleChange = useCallback(
    (field, value) => {
      handleGiftSelection(recipientId, index, field, value);
    },
    [handleGiftSelection, recipientId, index]
  );

  // ✅ Validation logic for all kid gift types
  useEffect(() => {
    let isValid = false;

    if (selectedType === "Toys") {
      isValid = !!gift.kidBudget;
    } else if (selectedType === "Perfume") {
      isValid = !!gift.perfumeBudget && !!gift.perfumeScent;
    }

    setGiftValid(index, isValid);
  }, [gift, index, selectedType, setGiftValid]);

  // 🎁 Budget options
  const toyBudgets = [
    "3500 PKR",
    "3500 – 5500 PKR",
    "5500 – 7500 PKR",
    "More than 7500 PKR",
  ];

  const perfumeBudgets = [
    "1000–1500 PKR",
    "1500–2000 PKR",
    "2000–2500 PKR",
    "2500–3000 PKR",
  ];

  // 🌸 Kid perfume scents
  const perfumeScents = ["Floral", "Fruity", "Citrus", "Woody"];

  return (
    <div className="mb-4">
      {/* 🧸 Toys */}
      {selectedType === "Toys" && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            What is your budget for the toy?
          </label>
          <div className="flex flex-col space-y-2">
            {toyBudgets.map((price) => (
              <label key={price} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`kidBudget-${recipientId}-${index}`}
                  checked={gift.kidBudget === price}
                  onChange={() => handleChange("kidBudget", price)}
                />
                <span className="text-gray-700">{price}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 🌸 Perfume (Kids) */}
      {selectedType === "Perfume" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              What is your budget for the perfume?
            </label>
            <div className="flex flex-col space-y-2">
              {perfumeBudgets.map((price) => (
                <label key={price} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`perfumeBudget-${recipientId}-${index}`}
                    checked={gift.perfumeBudget === price}
                    onChange={() => handleChange("perfumeBudget", price)}
                  />
                  <span className="text-gray-700">{price}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Does the child have a preferred scent?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {perfumeScents.map((scent) => (
                <label key={scent} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`perfumeScent-${recipientId}-${index}`}
                    checked={gift.perfumeScent === scent}
                    onChange={() => handleChange("perfumeScent", scent)}
                  />
                  <span className="text-gray-700">{scent}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KidGiftDetails;
