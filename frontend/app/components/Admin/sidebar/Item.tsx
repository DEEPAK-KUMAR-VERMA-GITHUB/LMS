import React, { FC, ReactElement } from "react";
import { MenuItem } from "react-pro-sidebar";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  to: string;
  icon: ReactElement;
  selected: string;
  setSelected: (selected: string) => void;
};

const Item: FC<Props> = ({ title, to, icon, selected, setSelected }) => {
  const router = useRouter();

  const handleClick = () => {
    setSelected(title);
    router.push(to);
  };

  return (
    <MenuItem
      active={selected === title}
      icon={icon}
      onClick={handleClick}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
    </MenuItem>
  );
};

export default Item;
