namespace PhotoStudio.Response;

public class ColumnDefintion {
    public string Title { get; set; } = default!;
    public string DataIndex { get; set; } = default!;
    public bool? Editable { get; set; } = false;
    public string? Dtype { get; set; }
};
