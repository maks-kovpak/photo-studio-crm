using System.Text.Json.Serialization;

namespace PhotoStudio.Response;

public class ColumnDefinition {
    public string Title { get; set; } = default!;
    public string DataIndex { get; set; } = default!;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Editable { get; set; } = false;

    [JsonPropertyName("dtype")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DType { get; set; }
};
