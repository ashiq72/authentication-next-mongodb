import React from "react";

function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      UserProfilePage
      <p className="text-3xl">
        Profile page:<span> </span>
        <span className="p-2 rounded-lg text-white font-mono font-medium text-xl bg-orange-400">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export default UserProfilePage;
