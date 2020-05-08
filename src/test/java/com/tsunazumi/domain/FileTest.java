package com.tsunazumi.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tsunazumi.web.rest.TestUtil;

public class FileTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(File.class);
        File file1 = new File();
        file1.setId(1L);
        File file2 = new File();
        file2.setId(file1.getId());
        assertThat(file1).isEqualTo(file2);
        file2.setId(2L);
        assertThat(file1).isNotEqualTo(file2);
        file1.setId(null);
        assertThat(file1).isNotEqualTo(file2);
    }
}
