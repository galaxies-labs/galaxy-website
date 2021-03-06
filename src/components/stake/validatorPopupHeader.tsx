import React from "react";
import { styled } from "@mui/system";
import { useAppSelector } from "../../store/hooks";

interface Props {
  moniker: string;
  commision: number;
  operatorAddress: string;
}

export default function ValidatorPopupHeader(props: Props) {
  const iconRef = React.useRef<HTMLImageElement>(null);
  const validatorImages = useAppSelector(
    s => s.staking.validator.validatorImages
  );

  React.useEffect(() => {
    if (iconRef.current && validatorImages.length && props.operatorAddress) {
      const image = validatorImages.filter(
        x => x.operator_address === props.operatorAddress
      )[0];
      if (image && image.src) {
        iconRef.current.src = image.src;
      }
    }
  }, [iconRef, validatorImages, props.operatorAddress]);

  return (
    <Container>
      <Icon
        ref={iconRef}
        alt="validator"
        src="/public/assets/images/validator.svg"
      />
      <div>
        <Moniker>{props.moniker}</Moniker>
        <br />
        <Comission>Comission - {props.commision}%</Comission>
      </div>
    </Container>
  );
}

const Comission = styled("span")`
  font-size: 14px;
  color: #999999;
`;

const Moniker = styled("span")`
  font-size: 20px;
  color: #2a267b;
  font-family: "Heebo-Medium";
`;

const Icon = styled("img")`
  width: 68px;
  height: 68px;
  margin-right: 20px;
  border-radius: 100%;
  object-fit: cover;
`;

const Container = styled("div")`
  background-color: #f7f7f7;
  padding: 24px 30px;
  display: flex;
  align-items: center;
`;
