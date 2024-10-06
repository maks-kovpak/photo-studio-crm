using System.Text.Json.Serialization;

namespace PhotoStudio.Response;

public class ColumnDefintion {
    public string Title { get; set; } = default!;
    public string DataIndex { get; set; } = default!;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Editable { get; set; } = false;

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Dtype { get; set; }
};
