import React from "react";
import MakeupGiftDetails from "./giftType/MakeupGiftDetails";
import WalletGiftDetails from "./giftType/WalletGiftDetails";
import JewelleryGiftDetails from "./giftType/JewelleryGiftDetails";
import PerfumeGiftDetails from "./giftType/PerfumeGiftDetails";
import EdibleGiftDetails from "./giftType/EdibleGiftDetails";
import ShoeGiftDetails from "./giftType/ShoeGiftDetails";
import ClothingGiftDetails from "./giftType/ClothingGiftDetails";
import KidGiftDetails from "./giftType/KidGiftDetails";

const GiftItem = ({
    gift,
    recipientId,
    index,
    handleGiftSelection,
    giftOptions,
    ageType,
    gender
}) => {



    let finalGiftOptions = [...giftOptions];

    if (gender === "Female" && ageType === "Adult") {
        finalGiftOptions.push("Makeup Products", "Bag/Wallet");
    }

    if (gender === "Male") {
        finalGiftOptions.push("Wallet");
    }

    if (gift.type && !finalGiftOptions.includes(gift.type)) {
        handleGiftSelection(recipientId, index, "type", "");
    }

    return (



        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            {/* ✅ Only show if recipient is an adult */}
            {ageType === "Adult" && (
                <>
                    {/* ⏳ How long have you known the recipient? */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            How long have you known the recipient?
                        </label>
                        <div className="flex flex-col space-y-2">
                            {["Less than a year", "1–3 year", "3–5 year", "5+ year"].map((option) => (
                                <label key={option} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={`duration-${recipientId}-${index}`}
                                        checked={gift.knownDuration === option}
                                        onChange={() =>
                                            handleGiftSelection(recipientId, index, "knownDuration", option)
                                        }
                                    />
                                    <span className="text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 🎨 Preferred style */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            What is your preferred style for this gift?
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {[
                                "Handmade & Crafted",
                                "Quirky & Unique",
                                "Funny & Lighthearted",
                            ].map((style) => (
                                <label key={style} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={gift.preferredStyle?.includes(style) || false}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            handleGiftSelection(recipientId, index, "preferredStyle", [
                                                ...(gift.preferredStyle || []).filter((s) => s !== style),
                                                ...(checked ? [style] : []),
                                            ]);
                                        }}
                                    />
                                    <span className="text-gray-700">{style}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Gift {index + 1}
            </h3>





            {/* Gift Type */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                    Gift Type
                </label>
                <select
                    value={gift.type || ""}
                    onChange={(e) =>
                        handleGiftSelection(recipientId, index, "type", e.target.value)
                    }
                    className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                    <option value="" disabled selected hidden>Select Gift Type</option>
                    {finalGiftOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>


            {gift.type === "Makeup Products" &&
                gender === "Female" &&
                ageType === "Adult" && (
                    <MakeupGiftDetails
                        gift={gift}
                        recipientId={recipientId}
                        index={index}
                        handleGiftSelection={handleGiftSelection}
                    />
                )}

            {(gift.type === "Bag/Wallet" || gift.type === "Wallet") && (
                <WalletGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                    gender={gender}
                />
            )}

            {gift.type === "Jewellery" && (
                <JewelleryGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                    gender={gender}
                    ageType={ageType}
                />
            )}

            {gift.type === "Perfume" && (
                <PerfumeGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                />
            )}

            {gift.type === "Edible Stuff" && (
                <EdibleGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                />
            )}

            {gift.type === "Shoes" && (
                <ShoeGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                    gender={gender}
                    ageType={ageType}
                />
            )}

            {gift.type === "Clothing" && (
                <ClothingGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                    gender={gender}
                    ageType={ageType}
                />
            )}

            {ageType === "Kid" && (
                <KidGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                />
            )}


        </div>
    );
};

export default GiftItem;
