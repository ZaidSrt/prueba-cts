
import BodyTable from "@/components/body-table";
import { useEffect, useState } from "react";

export default function Home() {

  const numeroUsuarios = 6;

  const [users, setUsers] = useState<User[]>([]);
  const [filterUsers, setFilterUsers] = useState<User[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    handleFilterUsers(filterValue);
  }, [filterValue]);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) return;

      let data = await response.json();
      data = data.slice(0, numeroUsuarios);

      setUsers(data);
      setFilterUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  const handleFilterUsers = (value: string) => {

    if (value == "") {
      setFilterUsers(users);
      return;
    }

    const filteredUsers = users.filter((user) => {
      if (user.name.toLowerCase().includes(value.toLowerCase()) || user.email.toLowerCase().includes(value.toLowerCase())) {
        return user;
      }
    });

    setFilterUsers(filteredUsers);
  };


  return (
    <div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <h4 className="text-xl">Buscar Usuarios</h4>
          <input placeholder="Ingresa Nombre o correo del usuario" className="w-[300px] py-2 px-4 border border-gray-400 rounded" type="text" value={filterValue} onChange={(event) => setFilterValue(event.target.value)} />
        </div>

        {loading ?
          <div className="flex justify-between items-center"><p>Cargando...</p></div> :
          filterUsers.length == 0 ?
            <div className="flex justify-center items-center"><p>No hay resultados</p></div> :
            <div>
              <table className="table-auto w-full text-lg">
                <thead>
                  <tr>
                    <th className="text-left">Nombre</th>
                    <th className="text-left">Correo</th>
                  </tr>
                </thead>
                <tbody>
                  {filterUsers.map((user) => <BodyTable key={user.id} user={user} />)}
                </tbody>
              </table>
            </div>
        }
      </div>
    </div>
  );
}
