import { useState } from "react";
import Typography from "@components/forms/Typography";
import {
  pendingWithdrawalsSampleData,
  pendingWithdrawalsTableHeader,
  transactionHistoryData,
  transactionHistoryTableHeader,
  UserRole,
  walletSampleData,
} from "@/data";
import CustomSwitchButton from "@/components/forms/CustomSwitchButton";
import EmptyState from "@components/molecules/EmptyState";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { SubscriptionHeader } from "../settings/SubscriptionHeader";
import CustomButton from "@/components/forms/CustomButton";
import { useForm } from "react-hook-form";

const Wallet = () => {
  const { control } = useForm();
  const [isEmpty] = useState(false);
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="">
      <SubscriptionHeader text="Wallet" />

      <section className="ml-4">
        <div className="bg-grey_10 p-4">
          <div className="flex items-center justify-between">
            <Typography variant="subtitle2" className="text-grey_800">
              Wallet{" "}
              {userObject.role === UserRole.creator ? "Balance" : "Credit"}
            </Typography>

            <CustomButton primaryButtonSize="xs" className="px-3">
              {userObject.role === UserRole.creator
                ? "Request Withdrawal"
                : "  Add Funds to Wallet"}
            </CustomButton>
          </div>

          <Typography variant="h6" className="py-4">
            $0.00
          </Typography>

          {userObject.role === UserRole.creator && (
            <Typography variant="p3" className="text-grey_600">
              Minimum withdrawal amount is $20{" "}
            </Typography>
          )}
        </div>

        {userObject.role !== UserRole.creator && (
          <div className="mt-1 px-4">
            {walletSampleData.map(({ id, name }) => {
              return (
                <div
                  key={id}
                  className="flex items-center justify-between mt-3"
                >
                  <Typography variant="p3" className="text-grey_600">
                    {name}
                  </Typography>

                  <CustomSwitchButton name="" control={control} label="" />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {userObject.role === UserRole.creator && (
        <div className="ml-4">
          <section className="px-4 flex items-center justify-between border border-grey_10">
            {pendingWithdrawalsTableHeader.map(({ id, name }) => (
              <div key={id} className="my-2 ">
                <Typography variant="labelOne" className="text-grey_600">
                  {name} {name === "Total" ? "$300.00" : ""}
                </Typography>
              </div>
            ))}
          </section>

          <div className="border-b border-x border-grey_10 px-4">
            {pendingWithdrawalsSampleData.map(({ id, date, desc, status }) => (
              <div key={id} className="my-2 flex items-center justify-between">
                <Typography variant="p3" className="text-grey_600">
                  {date}
                </Typography>
                <Typography variant="p3" className="text-grey_600">
                  {desc}
                </Typography>
                <Typography variant="labelOne" className="text-orange_100">
                  {status}
                </Typography>
              </div>
            ))}
          </div>

          <Typography variant="subtitle2" className="text-grey_800 pt-6 pb-2">
            Transaction History
          </Typography>

          <section className="px-4 flex items-center justify-between border border-grey_10">
            {transactionHistoryTableHeader.map(({ id, name }) => (
              <div key={id} className="my-2 ">
                <Typography
                  variant="labelOne"
                  className="text-grey_600 uppercase"
                >
                  {name}
                </Typography>
              </div>
            ))}
          </section>

          <div className="border-x border-grey_10">
            {transactionHistoryData.map(
              ({ id, dateAndTime, desc, amount, fee }) => (
                <div
                  key={id}
                  className="my-2 flex items-center justify-between border-b border-grey_10 px-4 py-2"
                >
                  <Typography variant="p3" className="text-grey_600">
                    {dateAndTime}
                  </Typography>
                  <Typography variant="p3" className="text-grey_600">
                    {desc}
                  </Typography>
                  <Typography variant="labelOne" className="text-grey_600">
                    {amount}
                  </Typography>
                  <Typography variant="p3" className="text-grey_600">
                    {fee}
                  </Typography>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {isEmpty && (
        <>
          <Typography variant="subtitle2" className="text-grey_800 pt-6 pl-4">
            Transaction History
          </Typography>

          <EmptyState
            text="No transactions made yet, when you make a transaction, 
it would display here"
            width="400"
          />
        </>
      )}
    </div>
  );
};

export { Wallet };
