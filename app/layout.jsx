import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'iPhone Lobos | Reparación y Venta de iPhones en Lobos',
  description:
    'Servicio técnico especializado en iPhone: cambio de pantalla, batería, placa base y venta de equipos reacondicionados en Lobos, Buenos Aires.',
  keywords: [
    'iPhone Lobos',
    'reparación de iPhone',
    'service iPhone Lobos',
    'venta de iPhones Lobos',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
