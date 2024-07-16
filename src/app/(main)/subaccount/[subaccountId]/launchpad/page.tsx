import React from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import BlurPage from "@/components/global/blur-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: {
    state: string;
    code: string;
  };
  params: {
    subaccountId: string;
  };
};

const LaunchPad = async ({ params, searchParams }: Props) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });

  if (!subaccountDetails) {
    return;
  }

  const allDetailsExist =
    subaccountDetails.address &&
    // subaccountDetails.subAccountLogo &&
    subaccountDetails.city &&
    subaccountDetails.companyEmail &&
    subaccountDetails.companyPhone &&
    subaccountDetails.country &&
    subaccountDetails.name &&
    subaccountDetails.state;

  // CHANGE BEFORE PRODUCTION

  //   const stripeOAuthLink = getStripOAuthLink(
  //     "subaccount",
  //     `launchpad___${subaccountDetails.id}`
  //   );

  //   let connectedStripeAccount = false;

  //   if (searchParams.code) {
  //     if (!subaccountDetails.connectAccountId) {
  //       try {
  //         const response = await stripe.oauth.token({
  //           grant_type: "authorization_code",
  //           code: searchParams.code,
  //         });

  //         await db.subAccount.update({
  //           where: {
  //             id: params.subaccountId,
  //           },
  //           data: {
  //             connectAccountId: response.stripe_user_id,
  //           },
  //         });
  //         connectedStripeAccount = true,
  //       } catch (error) {
  //         console.log('🔴 Could not connect stripe account', error)
  //       }
  //     }
  //   }

  return (
    <BlurPage>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full h-full max-w-[800px]">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Let's get started!</CardTitle>
              <CardDescription>
                Follow the steps below to get your account setup correctly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src="/appstore.png"
                    alt="app logo"
                    height={80}
                    width={80}
                    className="rounded-md object contain"
                  />
                  <p>Save the website as a shortcut on your mobile device</p>
                </div>
                <Button>Start</Button>
              </div>
              <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src="/stripelogo.png"
                    alt="app logo"
                    height={80}
                    width={80}
                    className="rounde-md object-contain"
                  />
                  <p>
                    Connect your stripe account to accept payments. Stipe is
                    used to run payouts
                  </p>
                </div>
                {/* CHANGE BEFORE PRODUCTION */}
                {/* {subaccountDetails.connectAccountId ||
                connectedStripeAccount ? (
                  <CheckCheckIcon
                    size={50}
                    className="text-primary p-2 flex-shrink-0"
                  />
                ) : (
                  <Link
                    className="bg-primary py-2 px-4 rounded-md text-white"
                    href={stripeOAuthLink}
                  >
                    Start
                  </Link>
                )} */}
              </div>
              <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  {/* <Image
                    src={subaccountDetails.subAccountLogo}
                    alt="app logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain p-4"
                  /> */}
                  <p>Fill in all your business details.</p>
                </div>
                {allDetailsExist ? (
                  <CheckCheckIcon
                    size={50}
                    className="text-primary p-2 flex-shrink-0"
                  />
                ) : (
                  <Link
                    className="bg-primary py-2 px-4 rounded-md text-white"
                    href={`/subaccount/${subaccountDetails.id}/settings`}
                  >
                    Start
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BlurPage>
  );
};

export default LaunchPad;
