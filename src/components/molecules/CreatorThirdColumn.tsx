/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../forms/Typography";
import verifyBlue from "../../assets/icons/verifyBlue.svg";
import calendar from "../../assets/icons/calendar.svg";
import plus from "../../assets/icons/plus.svg";
import { Link } from "react-router-dom";
import {
  thirdColumnSampleData,
  transactionHistorySampleData,
} from "../../data";

const CreatorThirdColumn = () => {
  return (
    <div>
      <section className="border border-grey_10 rounded-lg p-[14px]">
        <div className="bg-grey_10 p-4 rounded">
          <Typography variant="subtitle2" className="text-grey_800">
            Creator Wallet
          </Typography>
          <Typography variant="h6" className="pt-2 pb-4">
            $0.00
          </Typography>

          <div className="bg-blue_500 py-2 px-16 border border-grey_10 rounded-3xl drop-shadow-7xl">
            {/* <div className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"> */}
            <Typography
              variant="subtitle3"
              className="text-blue_100 whitespace-nowrap"
            >
              Request Withdrawal
            </Typography>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Typography variant="subtitle2" className="text-grey_800">
              Transaction History
            </Typography>
            <Typography variant="subtitle3" className="text-blue_500">
              VIEW MORE
            </Typography>
          </div>

          {transactionHistorySampleData.map((item) => (
            <div key={item.id} className="py-3 border-b border-grey_10">
              <div className="flex items-center justify-between">
                <Typography variant="titleTwo" className="text-grey_900">
                  {item.title}
                </Typography>
                <Typography variant="p2" className="text-grey_400">
                  Now
                </Typography>
              </div>
              <Typography variant="p2" className="text-grey_400">
                {item.content}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 p-3 border border-grey_10 rounded-lg">
        <Typography
          variant="subtitle2"
          className="text-grey_800 uppercase pb-[2px]"
        >
          Schedule
        </Typography>

        <div className="flex justify-between">
          <Typography
            variant="caption1"
            className="text-grey_400 capitalize pb-[2px] w-52"
          >
            schedule Posts, Messages and Streams to grow your online presence
          </Typography>
          <img src={plus} alt="plus" className="w-6 h-6" />
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          <img src={calendar} alt="calendar" className="w-6 h-6" />
          <Typography variant="subtitle2" className="text-grey_800 pt-6">
            You have no scheduled events
          </Typography>
          <Typography
            variant="p3"
            className="text-grey_500 pt-2 pb-8 text-center w-48"
          >
            Click the Add button at the top to create an event
          </Typography>
        </div>
      </div>

      <div className="mt-5 p-3 border border-grey_10 rounded-lg">
        <div className="flex items-center justify-between">
          <Typography variant="subtitle2" className="text-grey_800">
            Notifications
          </Typography>
          <Link to="/dashboard/notifications">
            <Typography variant="subtitle3" className="text-blue_500">
              VIEW MORE
            </Typography>
          </Link>
        </div>

        {thirdColumnSampleData.map(({ id, name, photo, tag, time }: any) => {
          return (
            <div
              key={id}
              className="flex items-center justify-between p-4 border-b border-grey_10"
            >
              <div className="flex items-center">
                <img src={photo} alt="demo" className="w-10 h-10" />

                <div className="ml-3">
                  <div className="flex items-center mb-1">
                    <Typography
                      variant="titleTwo"
                      className="text-grey_900 whitespace-nowrap"
                    >
                      {name}
                    </Typography>

                    <img src={verifyBlue} alt="demo" className=" h-4 w-4" />
                  </div>
                  <Typography variant="p2" className="text-grey_400">
                    {tag}
                  </Typography>

                  <Typography variant="p2" className="text-grey_700">
                    Subscribed to your account
                  </Typography>
                </div>
              </div>

              <Typography
                variant="p2"
                className="text-grey_400 whitespace-nowrap"
              >
                {time}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatorThirdColumn;
