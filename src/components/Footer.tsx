import '../styles/footer.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <span>CondoManagement &copy; {currentYear}</span>
    </footer>
  );
}
