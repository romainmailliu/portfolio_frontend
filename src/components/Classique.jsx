function Classique() {
  return (
    <div className="w-96 bg-white rounded-md border-2 border-gray-800 p-6">
      {/* Nom + rôle */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
          Jean Dupont
        </h1>
        <p className="text-gray-600 text-sm uppercase tracking-widest">
          Développeur React.js
        </p>
      </div>

      {/* Ligne séparatrice */}
      <div className="border-t border-gray-400 my-4"></div>

      {/* Infos */}
      <div className="space-y-2 text-sm text-gray-800">
        <p>Email : jean.dupont@email.com</p>
        <p>Tél : +33 6 12 34 56 78</p>
        <p>Web : www.jeandupont.dev</p>
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-gray-500 text-right">Paris, France</div>
    </div>
  );
}

export default Classique;
