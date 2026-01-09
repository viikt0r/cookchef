import { useRecipesStore } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import type { RecipeI } from "interfaces";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import { useShallow } from "zustand/react/shallow";
import styles from "./AdminRecipesForm.module.scss";

function AdminRecipesForm() {
  const { recipeId } = useParams();
  const { recipes, createR, updateR } = useRecipesStore(
    useShallow(({ recipes, createR, updateR }) => ({
      recipes,
      createR,
      updateR,
    }))
  );
  const recipe = recipes.find((r) => r._id === recipeId);
  const navigate = useNavigate();

  const defaultValues = {
    title: recipe ? recipe.title : "",
    image: recipe ? recipe.image : "",
  };

  const recipeSchema = yup.object({
    title: yup
      .string()
      .required("Le titre est obligatoire")
      .min(3, "Le titre doit faire au moins 3 caractères")
      .max(30, "Le titre ne peut pas dépasser 30 caractères"),
    image: yup
      .string()
      .required("L'URL de l'image est obligatoire")
      .url("L'URL de l'image n'est pas valide"),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
  } = useForm<{ title: string; image: string; generic?: string }>({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  async function submit(data: Partial<RecipeI>) {
    try {
      clearErrors();
      if (recipe) {
        await updateR({ ...data, _id: recipe._id });
        navigate("/admin/recipes/list");
      } else {
        await createR(data);
        reset(defaultValues);
      }
    } catch (error) {
      setError("generic", {
        type: "generic",
        message: "Il y a une erreur",
      });
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
    >
      <h2 className="mb-20">Ajouter une recette</h2>
      <div className="d-flex flex-column mb-20">
        <label htmlFor="">Titre de la recette</label>
        <input {...register("title")} type="text" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label htmlFor="">Image de la recette</label>
        <input {...register("image")} type="text" />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
        {errors.generic && (
          <p className="form-error">{errors.generic.message}</p>
        )}
      </div>
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}
export default AdminRecipesForm;
