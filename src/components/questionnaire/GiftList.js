import React, { useEffect, useCallback, useState } from "react";
import GiftItem from "./GiftItem";



const GiftList = ({
  recipient,
  recipients,
  giftOptions,
  handleGiftCountChange,
  handleGiftSelection,
  maxTotalItems,
  giftData,
  setIsStepValid
}) => {

  const [giftValidities, setGiftValidities] = useState({}); // <- object map

  
  
  
  // stable setter to prevent re-render loops & avoid unnecessary updates
  const setGiftValid = useCallback((recipientId, giftIndex, isValid) => {
    setGiftValidities(prev => {
      const key = `${recipientId}-${giftIndex}`;
      // avoid returning new object if nothing changed
      if (prev[key] === isValid) return prev;
      return { ...prev, [key]: isValid };
    });
  }, []);
  
  
  useEffect(() => {
  // If no entries yet, treat as false
  const values = Object.values(giftValidities);
  const allValid = values.length > 0 ? values.every(Boolean) : false;
  setIsStepValid(allValid); // setIsStepValid is from Questionnaire props/state
}, [giftValidities, setIsStepValid]);



  return (
    <div className="space-y-6">

      {/* 🎁 Gift inputs */}
      {recipient.gifts.map((gift, index) => (
        <GiftItem
          key={index}
          gift={gift}
          recipientId={recipient.id}
          index={index}
          handleGiftSelection={handleGiftSelection}
          giftOptions={giftOptions}
          ageType={recipient.ageType}
          gender={recipient.gender}
          setGiftValid={setGiftValid}
        />
      ))}
    </div>
  );
};

export default GiftList;
