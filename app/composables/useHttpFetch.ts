interface myFetchOptions {
  headers?: Record<string, string>;
  [key: string]: any;
}

export const useHttpFetch = (url: string, options: myFetchOptions = {}) => {
  // token  
  const token = useCookie('auth_token').value;
  // 添加请求头和token
  const headers = {
    ...options.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
  // 封装请求头 加上token
  options.headers = headers;
  // 发起请求
  return useFetch(url, {
    ...options,
    baseURL: '', // 设置基础URL
    // 拦截器
    onRequest ({ request, options }) {
      // Process the request before sending
      console.log('request:', request);
    },
    onRequestError ({ request, options, error }) {
      // Handle the request errors
      console.log('request error:', request, error);
    },
    onResponse ({ request, response, options }) {
      // Process the response data
      console.log('response:', response);

    },
    onResponseError ({ request, response, options }) {
      // Handle the response errors
      console.log('response error:', response);

    },

  });
}

// 定义接口
export const userInfoFetch = (opt: myFetchOptions = {}) => {
  return useHttpFetch('/api/user/info',opt);
}