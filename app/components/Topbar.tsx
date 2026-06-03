"use client";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="fixed top-0 right-0 left-0 z-[90] flex h-[52px] items-center gap-3 border-b border-grey-200 bg-white px-4 shadow-sm max-md:left-0 md:left-[230px]">
      <div>
        <h1 className="text-[15px] font-extrabold text-primary">{title}</h1>
        {subtitle && <p className="text-[11px] text-grey-500">{subtitle}</p>}
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-1.5">
        <div
          className="relative flex size-[30px] cursor-pointer items-center justify-center rounded-full bg-grey-100 text-[13px] transition-colors hover:bg-grey-200"
          title="Notifications"
        >
          🔔
          <div className="absolute top-1 right-1 size-1.5 rounded-full border-[1.5px] border-white bg-error" />
        </div>
      </div>
    </header>
  );
}
