import React from "react";
import Image from "next/image";
import classnames from "classnames";

const BreadCrumb = ({ items, className }) => {
  const containerClassnames = classnames(
    "breadcrumb-container flex gap-[10px] text-sm text-gray-300",
    className
  );

  return (
    <div className={containerClassnames}>
      {items?.map((item, index) => {
        return (
          <div key={index} className="flex gap-[10px] items-center">
            <a className="text-gray-300" href={item?.url || "#"}>
              {item?.label}
            </a>
            {index !== items?.length - 1 && (
              <Image
                src="/assets/right-arrow.svg"
                alt="arrow right"
                width={4}
                height={8}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
