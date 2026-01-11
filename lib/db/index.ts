"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { ID, Models, Permission, Role } from "node-appwrite";

import { Label } from "@/interfaces/label.interface";
import { Result } from "@/interfaces/result.interface";
import { withAuth } from "@/lib/auth";
import { DATABASE_ID, LABEL_COLLECTION_ID } from "@/lib/constants";
import { LabelFormData } from "@/lib/db/schemas";
import { createSessionClient } from "@/lib/server/appwrite";

/**
 * Get a list of labels
 * @param {string[]} queries The queries to filter the labels
 * @returns {Promise<Result<Models.RowList<Label>>>} The list of labels
 */
export async function listLabel(
  queries: string[] = []
): Promise<Result<Models.RowList<Label>>> {
  return withAuth(async (user) => {
    const { database } = await createSessionClient();

    return unstable_cache(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (queries, userId) => {
        try {
          const labels = await database.listRows<Label>({
            databaseId: DATABASE_ID,
            tableId: LABEL_COLLECTION_ID,
            queries: queries,
          });

          return {
            success: true,
            message: "Label successfully retrieved.",
            data: labels,
          };
        } catch (err) {
          const error = err as Error;

          return {
            success: false,
            message: error.message,
          };
        }
      },
      ["labels"],
      {
        tags: [
          "labels",
          `labels:${queries.join("-")}`,
          `labels:user-${user.$id}`,
        ],
        revalidate: 600,
      }
    )(queries, user.$id);
  });
}

/**
 * Get a label by ID
 * @param {string} labelId The ID of the label
 * @param {string[]} queries The queries to filter the label
 * @returns {Promise<Result<Label>>} The label
 */
export async function getLabelById(
  labelId: string,
  queries: string[] = []
): Promise<Result<Label>> {
  return withAuth(async () => {
    const { database } = await createSessionClient();

    return unstable_cache(
      async () => {
        try {
          const label = await database.getRow<Label>({
            databaseId: DATABASE_ID,
            tableId: LABEL_COLLECTION_ID,
            rowId: labelId,
            queries: queries,
          });

          return {
            success: true,
            message: "Label successfully retrieved.",
            data: label,
          };
        } catch (err) {
          const error = err as Error;

          return {
            success: false,
            message: error.message,
          };
        }
      },
      ["label", labelId],
      {
        tags: ["labels", `label:${labelId}`],
        revalidate: 600,
      }
    )();
  });
}

/**
 * Create a label
 * @param {Object} params The parameters for creating a label
 * @param {string} [params.id] The ID of the label (optional)
 * @param {LabelFormData} params.data The label data
 * @param {string[]} [params.permissions] The permissions for the label (optional)
 * @returns {Promise<Result<Label>>} The created label
 */
export async function createLabel({
  id = ID.unique(),
  data,
  permissions = [],
}: {
  id?: string;
  data: LabelFormData;
  permissions?: string[];
}): Promise<Result<Label>> {
  return withAuth(async (user) => {
    const { database } = await createSessionClient();

    permissions = [
      ...permissions,
      Permission.read(Role.user(user.$id)),
      Permission.write(Role.user(user.$id)),
    ];

    try {
      const label = await database.createRow<Label>({
        databaseId: DATABASE_ID,
        tableId: LABEL_COLLECTION_ID,
        rowId: id,
        data: data,
        permissions: permissions,
      });

      revalidateTag("labels");

      return {
        success: true,
        message: "Label successfully created.",
        data: label,
      };
    } catch (err) {
      const error = err as Error;

      return {
        success: false,
        message: error.message,
      };
    }
  });
}

/**
 * Update a label
 * @param {Object} params The parameters for creating a label
 * @param {string} [params.id] The ID of the label
 * @param {LabelFormData} params.data The label data
 * @param {string[]} [params.permissions] The permissions for the label (optional)
 * @returns {Promise<Result<Label>>} The updated label
 */
export async function updateLabel({
  id,
  data,
  permissions = undefined,
}: {
  id: string;
  data: LabelFormData;
  permissions?: string[];
}): Promise<Result<Label>> {
  return withAuth(async () => {
    const { database } = await createSessionClient();

    try {
      const label = await database.updateRow<Label>({
        databaseId: DATABASE_ID,
        tableId: LABEL_COLLECTION_ID,
        rowId: id,
        data: data,
        permissions: permissions,
      });

      revalidateTag("labels");
      revalidateTag(`label:${id}`);

      return {
        success: true,
        message: "Label successfully updated.",
        data: label,
      };
    } catch (err) {
      const error = err as Error;

      return {
        success: false,
        message: error.message,
      };
    }
  });
}

/**
 * Delete a label
 * @param {string} id The ID of the label
 * @returns {Promise<Result<Label>>} The deleted label
 */
export async function deleteLabel(id: string): Promise<Result<Label>> {
  return withAuth(async () => {
    const { database } = await createSessionClient();

    try {
      await database.deleteRow({
        databaseId: DATABASE_ID,
        tableId: LABEL_COLLECTION_ID,
        rowId: id,
      });

      revalidateTag("labels");

      return {
        success: true,
        message: "Label successfully deleted.",
      };
    } catch (err) {
      const error = err as Error;

      return {
        success: false,
        message: error.message,
      };
    }
  });
}
