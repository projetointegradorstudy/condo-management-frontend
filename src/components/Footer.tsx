import '../styles/footer.scss';

interface footerProps {
  isFull?: boolean;
}

export function Footer({ isFull }: footerProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isFull ? 'full' : ''}`}>
      <span>CondoManagement &copy; {currentYear}</span>
    </footer>
  );
}
