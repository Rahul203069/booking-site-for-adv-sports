"use client";

import React from "react";
import Link from "next/link";
import { Activity } from "../types";
import { StarIcon, HeartIcon } from "./Icons";

interface ActivityCardProps {
  activity: Activity;
  searchParams?: {
    date?: string;
    guests?: number;
  };
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  searchParams,
}) => {
  const query = new URLSearchParams();

  if (searchParams?.date) query.set("date", searchParams.date);
  if (searchParams?.guests)
    query.set("guests", searchParams.guests.toString());

  const href = `/activity/${activity.id}${
    query.toString() ? `?${query.toString()}` : ""
  }`;

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 mb-3">
        <img
          src={activity.images[0]}
          alt={activity.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute top-3 right-3">
          <HeartIcon className="text-white drop-shadow-md hover:text-red-500 hover:fill-current transition-colors" />
        </div>

        {activity.vendor.name === "Superhost" && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
            Guest favorite
          </div>
        )}
      </div>

      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900 truncate pr-2">
          {activity.location}
        </h3>
        <div className="flex items-center gap-1 text-sm">
          <StarIcon className="w-4 h-4 text-gray-900" fill="currentColor" />
          <span>{activity.rating}</span>
        </div>
      </div>

      <p className="text-gray-500 text-sm">{activity.title}</p>
      <p className="text-gray-500 text-sm">
        {activity.duration} • {activity.difficulty}
      </p>

      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-semibold text-gray-900">
          ${activity.price}
        </span>
        <span className="text-gray-900 text-sm"> / person</span>
      </div>
    </Link>
  );
};

export default ActivityCard;
