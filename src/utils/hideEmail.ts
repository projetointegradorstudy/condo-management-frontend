export default function hideEmail(email: string) {
  if (!email.length) return;
  const [username, domain] = email.split('@');

  const hiddenUsername = username.slice(0, 2) + '*'.repeat(username.length - 4) + username.slice(-2);
  const hiddenDomain = domain.slice(0, 2) + '*'.repeat(domain.length - 4) + domain.slice(-2);

  return `${hiddenUsername}@${hiddenDomain}`;
}
