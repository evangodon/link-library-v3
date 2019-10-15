export const cookie = {
  set: ({ name, value }: { name: string; value: string }) =>
    (document.cookie = `${name}=${value}`),

  get: (name: string) =>
    document.cookie.replace(
      new RegExp('(?:(?:^|.*;s*))' + name + 's*=s*([^;]*).*$)|^.*$'),
      '$1'
    ),

  delete: (name: string) =>
    (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`),
};
