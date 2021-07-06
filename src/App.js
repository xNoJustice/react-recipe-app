import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import logo from "./logo.svg";
import "./logo.css";

function App() {
  const [recipes, setRecipes] = useState(
    localStorage.getItem("recipes")
      ? JSON.parse(localStorage.getItem("recipes"))
      : [
          {
            id: Date.now(),
            name: "Welcome to Recipe App.",
            ingredients: "",
            instructions: "",
          },
        ]
  );
  const [modal, setModal] = useState(false);
  const [recipeModal, setRecipeModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    const data = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(data);
  }, [recipes, search, setFilteredRecipes]);

  const openRecipeModal = (recipe_id) => {
    let recipe = recipes.find((recipe) => recipe.id === recipe_id);
    setId(recipe_id);
    setName(recipe.name);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setRecipeModal(true);
  };

  const toggleModal = (recipe_id) => {
    setRecipeModal(false);
    setModal(true);
    if (recipe_id) {
      let recipe = recipes.find((recipe) => recipe.id === recipe_id);
      setId(recipe_id);
      setName(recipe.name);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
    }
  };

  const closeModal = () => {
    setRecipeModal(false);
    setModal(false);
    if (id) {
      setId("");
      setName("");
      setIngredients("");
      setInstructions("");
    }
  };

  const createRecipe = () => {
    setRecipes([
      ...recipes,
      {
        id: Date.now(),
        name: name,
        ingredients: ingredients,
        instructions: instructions,
      },
    ]);
    closeModal();
  };

  const updateRecipe = () => {
    let newRecipes = recipes.map((recipe) => {
      if (recipe.id !== id) {
        return recipe;
      }
      return {
        ...recipe,
        name: name,
        ingredients: ingredients,
        instructions: instructions,
      };
    });
    setRecipes(newRecipes);
    closeModal();
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    closeModal();
  };

  return (
    <div className="w-full h-screen mx-auto p-6">
      <img src={logo} className="logo mx-auto" alt="logo" />
      <div className="flex justify-center mx-20">
        <div>
          <button
            onClick={() => toggleModal()}
            className="w-full px-4 py-3 text-sm font-semibold text-center text-white transition duration-200 ease-in shadow-md bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            Create New One
          </button>
        </div>
        <div className="flex relative mb-3 ml-3 w-60">
          <span className="rounded-l-md h-12 w-12 inline-flex items-center pl-3 bg-white dark:bg-gray-700 text-gray-500 dark:text-white shadow-sm">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <input
            type="text"
            className="rounded-r-lg flex-1 h-12 w-30 outline-none py-1 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-100 shadow-sm text-base"
            placeholder="Search Recipe Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => openRecipeModal(recipe.id)}
            className="w-60 mx-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-48 md:w-48"
          >
            <div className="w-full p-4 bg-gray-100 dark:bg-gray-800">
              <p className="text-lg font-medium text-center text-indigo-500 dark:text-green-300">
                {recipe.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-1/3 mx-auto my-6">
              <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                    {id ? "Edit Recipe" : "Create Recipe"}
                  </h3>
                  <div className="absolute mt-1 right-4 top-4">
                    <button
                      onClick={() => closeModal()}
                      className="bg-transparent border border-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-700 dark:text-white"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative max-h-80 overflow-y-auto flex-auto p-4">
                  <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                    <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                      Recipe Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Recipe Name ..."
                      className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                      autoFocus
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="relative max-h-80 overflow-y-auto flex-auto p-4">
                  <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                    Recipe Ingredients
                  </label>
                  <div className="text-lg leading-relaxed text-gray-600">
                    <CKEditor
                      editor={ClassicEditor}
                      data={ingredients}
                      onChange={(e, editor) => {
                        const data = editor.getData();
                        setIngredients(data);
                      }}
                    />
                  </div>
                </div>
                <div className="relative max-h-80 overflow-y-auto flex-auto p-4">
                  <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                    Recipe Instructions
                  </label>
                  <div className="text-lg leading-relaxed text-gray-600">
                    <CKEditor
                      editor={ClassicEditor}
                      data={instructions}
                      onChange={(e, editor) => {
                        const data = editor.getData();
                        setInstructions(data);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                    onClick={() => (id ? updateRecipe() : createRecipe())}
                    style={{ transition: "all .15s ease" }}
                  >
                    {id ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}

      {recipeModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-1/3 mx-auto my-6">
              <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                    {name}
                  </h3>
                  <div className="absolute mt-1 right-4 top-4">
                    <button
                      onClick={() => closeModal()}
                      className="bg-transparent border border-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-700 dark:text-white"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative max-h-80 overflow-y-auto flex-auto p-4">
                  <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                    Recipe Ingredients
                  </label>
                  <div
                    className="z-10 p-2 text-gray-500 dark:text-white overflow-auto"
                    dangerouslySetInnerHTML={{ __html: ingredients }}
                  ></div>
                </div>
                <div className="relative max-h-80 overflow-y-auto flex-auto p-4">
                  <label className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100">
                    Recipe Instructions
                  </label>
                  <div
                    className="z-10 p-2 text-gray-500 dark:text-white overflow-auto"
                    dangerouslySetInnerHTML={{ __html: instructions }}
                  ></div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-blue-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                    onClick={() => toggleModal(id)}
                    style={{ transition: "all .15s ease" }}
                  >
                    <div className="flex justify-between">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 -mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </div>
                  </button>
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-red-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                    onClick={() => deleteRecipe(id)}
                    style={{ transition: "all .15s ease" }}
                  >
                    <div className="flex justify-between">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 -mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </div>
  );
}

export default App;
