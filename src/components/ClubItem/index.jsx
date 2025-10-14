"use client";
import Image from "next/image";
import { useState } from "react";
import ClubModal from "@/components/ClubModal";
const ClubItem = ({ data }) => {
  const [activeItem, setActiveItem] = useState(false);

  const onItemClick = () => {
    setActiveItem(true);
  }

  return (
    <>
      <div className="schools-clubs__item" onClick={() => onItemClick()}>
        <div className="schools-clubs__item__image">
          <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.icon}`} alt={data.title} fill />
        </div>
        <div className="schools-clubs__item__title">{data.title}</div>
      </div>
      <ClubModal data={data} active={activeItem} setActive={setActiveItem} />
    </>
  );
};

export default ClubItem;
