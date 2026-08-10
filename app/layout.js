import './styles.css';

export const metadata = { title: 'Tugas Pintar', description: 'Aplikasi senarai tugasan yang ringkas dan teratur.' };

export default function RootLayout({ children }) {
  return <html lang="ms"><body>{children}</body></html>;
}
