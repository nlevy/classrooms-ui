
export function translateError(errorResponse, t, language) {
  try {
    const { code, params, message } = errorResponse.error || {};

    if (!code) {
      return t("errorUploadFailed") || "An error occurred";
    }

    const errorTemplate = t(`errors.${code}`);

    if (errorTemplate === `errors.${code}`) {
      console.warn(`Missing translation for error code: ${code}`);
      return message || t("errorUploadFailed") || "An error occurred";
    }

    if (params && Object.keys(params).length > 0) {
      return substituteParams(errorTemplate, params);
    }

    return errorTemplate;
  } catch (error) {
    console.error("Error translating server error:", error);
    return t("errorUploadFailed") || "An error occurred";
  }
}

function substituteParams(template, params) {
  let result = template;

  Object.entries(params).forEach(([key, value]) => {
    const displayValue = Array.isArray(value) ? value.join(", ") : value;

    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder, "g"), displayValue);
  });

  return result;
}
