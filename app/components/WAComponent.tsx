'use client';

export function WAComponent() {
    const inviteUrl = 'https://chat.whatsapp.com/GJ5ZbLaCEplFLNg1GJfJ02';
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=384x384&color=041a10&bgcolor=ffffff&margin=0&data=${encodeURIComponent(inviteUrl)}`;
/* eslint-disable @next/next/no-img-element */

return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#02120b] via-[#072919] to-[#041a10] p-6 text-center sm:p-10 selection:bg-[#25D366] selection:text-[#02120b]">
        <div className="pointer-events-none absolute -top-28 -left-28 h-96 w-96" />
        <div className="pointer-events-none absolute -right-28 -bottom-28 h-96 w-96" />

        <div className="relative z-10 flex h-full w-full max-w-5xl flex-col items-center justify-evenly gap-8 rounded-4xl border border-[#25D366]/45 bg-[#041a10]/75 p-6 shadow-[0_0_70px_-15px_rgba(37,211,102,0.55)] sm:p-12">
            <header className="space-y-4">
                <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                    Komm in die <span className="text-[#25D366]">WhatsApp</span>-Gruppe!
                </h2>
            </header>

            <div className="text-3xl text-white">
                Bleib auf dem neuesten Stand, was wir planen und was im Fachbereich so ansteht!
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-2xl">
                <img
                    src={qrSrc}
                    alt="QR-Code für die Fachbereich IuE WhatsApp-Gruppe"
                    className="h-96 w-96 object-contain sm:h-80 sm:w-80"
                />
            </div>
        </div>
    </section>
);
}