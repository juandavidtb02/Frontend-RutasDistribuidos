import React from "react";

export default function Welcome({name}) {
    return(
        <h1 
            className="flex fixed select-none tems-center justify-center p-2 bottom-0 mb-3 ml-3 bg-red-500 rounded-xl border-white border-2 focus:shadow-outline z-10 text-white"
        >
            Bienvenido {name}!
        </h1>
    )
}