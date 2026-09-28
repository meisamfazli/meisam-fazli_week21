const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/$/, "");

const getToken = () => localStorage.getItem("warehouse_token");

async function request(path, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("warehouse_token");
    window.dispatchEvent(new Event("auth-expired"));
  }

  if (!response.ok) {
    throw new Error(data?.message || "خطایی در ارتباط با سرور رخ داد.");
  }

  return data;
}

export const authApi = {
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export const productsApi = {
  list: ({
    page = 1,
    limit = 10,
    name = "",
    minPrice = "",
    maxPrice = "",
  } = {}) => {
    const params = new URLSearchParams({ page, limit });

    if (name.trim()) {
      params.set("name", name.trim());
    }

    if (minPrice !== "") {
      params.set("minPrice", minPrice);
    }

    if (maxPrice !== "") {
      params.set("maxPrice", maxPrice);
    }

    return request(`/products?${params.toString()}`);
  },

  create: (payload) =>
    request("/products", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (id, payload) =>
    request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  remove: (id) =>
    request(`/products/${id}`, {
      method: "DELETE",
    }),

  removeMany: (ids) =>
    request("/products", {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    }),
};
