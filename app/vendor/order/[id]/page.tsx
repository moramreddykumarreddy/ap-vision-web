"use client";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatusBadge,
  ProgressBar,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@/app/components/ui";
import { cn } from "@/app/lib/cn";

const ordersData: Record<string, object> = {
  "ORD-001": {
    id: "ORD-001",
    district: "Krishna",
    mandal: "Vijayawada",
    items: 150,
    type: "Single Vision",
    frame: "Full Rim",
    ordered: "25 May 2025",
    expected: "10 Jun 2025",
    status: "In Progress",
    progress: 60,
    contact: "Ravi Shankar",
    phone: "9876543210",
    address: "District Hospital, Vijayawada",
  },
  "ORD-002": {
    id: "ORD-002",
    district: "Guntur",
    mandal: "Tenali",
    items: 200,
    type: "Bifocal",
    frame: "Half Rim",
    ordered: "20 May 2025",
    expected: "05 Jun 2025",
    status: "Delivered",
    progress: 100,
    contact: "Narayana Rao",
    phone: "9765432109",
    address: "PHC Building, Tenali",
  },
};

const timeline = [
  { step: "Order Placed", time: "25 May 2025, 09:00 AM", done: true },
  { step: "Manufacturing Started", time: "26 May 2025, 02:00 PM", done: true },
  { step: "Quality Check", time: "28 May 2025, 11:00 AM", done: true },
  { step: "Dispatched", time: "01 Jun 2025, 04:00 PM", done: false },
  { step: "Delivered", time: "Expected: 10 Jun 2025", done: false },
];

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const order = (ordersData[id as string] ?? ordersData["ORD-001"]) as Record<
    string,
    unknown
  >;

  return (
    <AppShell
      sidebar={
        <Sidebar
          role="vendor"
          userName="Vision Plus Ltd"
          userSub="Spectacle Vendor"
        />
      }
      topbar={
        <Topbar
          title={`Order ${order.id as string}`}
          subtitle={`${order.district as string} District`}
        />
      }
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <Card className="mb-2.5">
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <StatusBadge label={order.status as string} />
            </CardHeader>
            <CardBody>
              {[
                { l: "Order ID", v: order.id },
                { l: "District", v: order.district },
                { l: "Mandal", v: order.mandal },
                { l: "Lens Type", v: order.type },
                { l: "Frame Type", v: order.frame },
                { l: "Quantity", v: `${order.items} pairs` },
                { l: "Ordered Date", v: order.ordered },
                { l: "Expected Delivery", v: order.expected },
              ].map((item) => (
                <div
                  key={item.l as string}
                  className="flex justify-between border-b border-grey-50 py-2 last:border-b-0"
                >
                  <span className="text-xs text-grey-400">
                    {item.l as string}
                  </span>
                  <span className="text-[13px] font-bold">
                    {item.v as string}
                  </span>
                </div>
              ))}
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between">
                  <span className="text-xs text-grey-400">Progress</span>
                  <span className="text-[13px] font-bold">
                    {order.progress as number}%
                  </span>
                </div>
                <ProgressBar value={order.progress as number} color="#1A3A6B" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardBody>
              {[
                { l: "Nodal Contact", v: order.contact },
                { l: "Phone", v: order.phone },
                { l: "Delivery Address", v: order.address },
              ].map((item) => (
                <div key={item.l as string} className="mb-3 last:mb-0">
                  <div className="text-[10px] font-bold text-grey-400">
                    {item.l as string}
                  </div>
                  <div className="text-[13px] font-bold">
                    {item.v as string}
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col">
                {timeline.map((t, j) => (
                  <div
                    key={t.step}
                    className="relative flex flex-col gap-0.5 pb-4 pl-5 last:pb-0"
                  >
                    {j < timeline.length - 1 && (
                      <div className="absolute left-[4px] top-3 h-[calc(100%-8px)] w-0.5 bg-grey-200" />
                    )}
                    <div
                      className={cn(
                        "absolute left-0 top-1 size-2.5 rounded-full border-2",
                        t.done
                          ? "border-success bg-success"
                          : "border-grey-300 bg-white",
                      )}
                    />
                    <div
                      className={cn(
                        "text-[13px]",
                        t.done
                          ? "font-bold text-primary"
                          : "font-medium text-grey-300",
                      )}
                    >
                      {t.step}
                    </div>
                    <div className="text-[11px] text-grey-300">{t.time}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <div className="mt-4 flex gap-2.5">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => router.push("/vendor/delivery")}
            >
              Update Status
            </Button>
            <Button variant="outline" className="flex-1">
              Download Invoice
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
