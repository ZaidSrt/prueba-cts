export default function BodyTable({ user }: { user: User }) {
  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  );
};