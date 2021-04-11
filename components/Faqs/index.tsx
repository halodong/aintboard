import { useState } from "react";
import AnimateHeight from "react-animate-height";

import { FaqsWrapper, FaqLinkContainer } from "./styled";

const list: ListProps[] = [
  {
    key: "stars",
    label: "How do I earn stars?",
    content: "Every 10 likes on your Review will gain you a star",
    height: 0,
  },
  {
    key: "stars2",
    label: "What can I do with my stars?",
    content: "Every star can be converted to a GamingLib voucher",
    height: 0,
  },
  {
    key: "powerups",
    label: "How do I earn PowerUps?",
    content: "They are earned by achieving Challenges",
    height: 0,
  },
  {
    key: "powerups2",
    label: "What can I do with my PowerUps?",
    content: "They can be traded with our Special Avatars",
    height: 0,
  },
];

const Faqs = () => {
  const [triggerAccordion, setTriggerAccordion] = useState(list);

  const trigger = (key: string) => {
    let accordion = triggerAccordion.map((a) => {
      if (a.key === key) {
        return {
          ...a,
          height: a.height === "auto" ? 0 : "auto",
        };
      }

      return {
        ...a,
        height: 0,
      };
    });

    setTriggerAccordion(accordion);
  };

  return (
    <FaqsWrapper>
      {triggerAccordion.map((l, i) => (
        <FaqLinkContainer key={`${l.key}-${i}`}>
          <button onClick={() => trigger(l.key)}>{l.label}</button>

          <AnimateHeight duration={300} height={l.height}>
            <p>{l.content}</p>
          </AnimateHeight>
        </FaqLinkContainer>
      ))}
    </FaqsWrapper>
  );
};

type ListProps = {
  key: string;
  label: string;
  content: string;
  height: string | number;
};

export default Faqs;
