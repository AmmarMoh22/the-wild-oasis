import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function CreateEditCabin(newCabin, id) {
  const hasImage =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);
  const imageName = hasImage
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name.replaceAll("/", "")}`;
  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins%20images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be saved");
  }

  if (hasImage) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    if (!id) await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin image couldn't be uploaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Error deleting cabin");
  }
}
